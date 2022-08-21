<a href="https://random-bar.niklashansen.dev">
  <img align="right" width="50" height="50" style="margin-bottom:50px;" src="https://random-bar.niklashansen.dev/assets/pin-3.8ca7dbdb.svg" />
</a>

# Random bar
Random bar is a web application built with Vite, React and Google Maps.

<p>
<img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
</p>


## Introduction

![Example of how it looks when the application finds a bar](https://random-bar.niklashansen.dev/linking.png)

- Bases search result on your current location or selected location.
- 100% self-hosted, all you need is an API key from Google.
- Can be deployed through Github Actions.

## Setup
-  [Start by generating a API Key](https://console.cloud.google.com/apis/credentials)
-  Make sure the API key has access to:
    - Geocoding API
    - Geolocation API
    - Maps JavaScript API
    - Places API 
- create a .env file:
    - VITE_GOOGLE_MAPS_API_KEY_DEV=YOUR_API_KEY_DEV
    - VITE_GOOGLE_MAPS_API_KEY_PROD=YOUR_API_KEY_PROD

## Deploy with Github Actions
The current workflow is configured with AWS, if you want to use something else, you'll have to setup your own workflow.

Current workflow includes:
  - Deployment to S3
  - Invalidation of distribution on Cloudfront
  
 To start using the current workflow, you'll have to setup a IAM user with access to the specific s3-bucket and distribution id for Cloudfront.

You'll also need to set these Github Action secrets:
  - AWS_ACCESS_KEY_ID
  - AWS_REGION
  - AWS_SECRET_ACCESS_KEY
  - DISTRIBUTION_ID
  - VITE_GOOGLE_MAPS_API_KEY_PROD
  - S3_BUCKET_NAME


