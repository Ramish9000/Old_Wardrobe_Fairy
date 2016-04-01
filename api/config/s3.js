var bucket = 'wardrobefairy';
var region = 'Oregon';

module.exports = {
  bucket: bucket,
  dirname: 'uploads',
  region: region,
  filepath: 'https://s3-' + region + '.amazonaws.com/' + bucket + '/'
}