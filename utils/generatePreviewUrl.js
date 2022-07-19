const generatePreviewUrl = (url = '', test = false) => test ? url.replace('/images', '/previews').replace('.png', '.jpg') : url;

module.exports = generatePreviewUrl;
