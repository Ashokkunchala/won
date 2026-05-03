/// this is a Jenkinsfile to push image to ECR
pipeline {
    agent any
    environment {
        aws_account_id = '381492115031' // Replace with your AWS account ID
        AWS_REGION = 'us-east-1'
        ECR_REPOSITORY = 'my-node-repo'
        // Set the image tag with a unique value, such as the build number or a timestamp
        IMAGE_TAG = 'v1.0-${BUILD_NUMBER}'
    }
    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Ashokkunchala/won.git'
                echo 'Git checkout is done.'
            }
        }
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh "docker build -t ${ECR_REPOSITORY}:${IMAGE_TAG} ."
                    echo 'Docker image built successfully.'
                }
            }
        }
        stage('Push to ECR') {
            steps {
                script {
                    // Authenticate with ECR
                    sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${aws_account_id}.dkr.ecr.${AWS_REGION}.amazonaws.com"
                    
                    // Tag the image with the ECR repository URI
                    sh "docker tag ${ECR_REPOSITORY}:${IMAGE_TAG} ${aws_account_id}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}"
                    
                    // Push the image to ECR
                    sh "docker push ${aws_account_id}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}"
                    echo 'Docker image pushed to ECR successfully.'
                }
            }
        }
    }
}