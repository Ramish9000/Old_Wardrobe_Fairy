var bucket = 'wardrobefairy';
var region = 'us-west-2';

module.exports = {
  bucket: bucket,
  dirname: 'uploads',
  region: region,
  filepath: 'https://s3-' + region + '.amazonaws.com/' + bucket + '/'
}