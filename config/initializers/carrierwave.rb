CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws'                        # required
  config.fog_credentials = {
    provider:              'AWS',                        # required
    aws_access_key_id:     ENV['AWS_ACCESS_KEY_ID'],                        # required unless using use_iam_profile
    aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],                        # required unless using use_iam_profile
    host:                  's3.amazonaws.com'             # optional, defaults to nil

  }
  if Rails.env.production?
    config.fog_directory  = ENV["PRODUCTION_S3_BUCKET"]
  else
    config.fog_directory  = ENV["DEVELOPMENT_S3_BUCKET"]
  end
end
