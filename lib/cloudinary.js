const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dc9l6nzid', 
    api_key: '655885314288553', 
    api_secret: 'qd3DvsEHOwu4aw7hTRCiNxZJEs8' 
  });

  module.exports = cloudinary;