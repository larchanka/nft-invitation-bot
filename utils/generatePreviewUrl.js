const generatePreviewUrl = (url) => url?.replace('/images', '/previews').replace('.png', '.jpg');

module.exports = generatePreviewUrl;
