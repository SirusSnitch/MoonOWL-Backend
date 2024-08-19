const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const AdminBroUpload = require('@admin-bro/upload');
const path = require('path');
const User = require('./models/user')
const Product = require('./models/product')
AdminBro.registerAdapter(AdminBroMongoose)
const bcrypt = require('bcrypt');



const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: {
            type: 'password', // Ensures the password is not displayed in plaintext
          },
        },
        actions: {
          delete: {
            isAccessible: true, // Ensure the delete action is accessible
            isVisible: true, // Ensure the delete button is visible
          },
          new: {
            before: async (request) => {
              if (request.payload.password) {
                const salt = await bcrypt.genSalt(10);
                request.payload.password = await bcrypt.hash(request.payload.password, salt);
              }
              return request;
            },
          },
          edit: {
            before: async (request) => {
              if (request.payload.password) {
                const salt = await bcrypt.genSalt(10);
                request.payload.password = await bcrypt.hash(request.payload.password, salt);
              }
              return request;
            },
          },
        },
      },
    },
    {
        resource: Product,
        options: {
          properties: {
            image: {
              isVisible: { list: true, filter: false, show: true, edit: true },
              components: {
                edit: AdminBroUpload.Edit,
                list: AdminBroUpload.List,
              },
            },
          },
        },
        features: [
          AdminBroUpload({
            provider: { local: { bucket: path.join(__dirname, 'Assets') } },
            properties: {
              key: 'image',
              mimeTypes: ['image/png', 'image/jpeg'],
            },
            uploadPath: (record, filename) => {
              if (record.id) {
                return `Assets/${Date.now()}-${filename}`;
              }
              return null;
            },
            hooks: {
              before: async (request, context) => {
                if (request.method === 'post') {
                  context.uploadPath = `Assets/${Date.now()}-${context.file.name}`;
                }
                return request;
              },
              after: async (response, request, context) => {
                if (context.uploadPath && response.record.id) {
                  await context.resource.update(response.record.id, { image: context.uploadPath });
                }
                return response;
              },
            },
          }),
        ],
      },



        /* options: {
          properties: {
            image: {
              isVisible: { list: true, filter: false, show: true, edit: true },
              components: {
                edit: AdminBroUpload.Edit,
                list: AdminBroUpload.List,
              },
            },
          },
        },
        features: [
          AdminBroUpload({
            provider: { local: { bucket: path.join(__dirname, 'Assets') } },  // Using the path module
            properties: {
              key: 'image', // The property in your schema where the image path is stored
              mimeTypes: ['image/png', 'image/jpeg'], // Supported file types
            },
            uploadPath: (record, filename) => `Assets/${Date.now()}-${filename}`, // Path format for uploaded files
          }),
        ],
      }, */
      
  ],
  
})
module.exports = adminRouter = AdminBroExpress.buildRouter(adminBro)