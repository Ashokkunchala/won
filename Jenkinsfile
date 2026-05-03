/// this is a Jenkinsfile to push image to ECR
pipeline {
    agent any
    environment {
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
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${ECR_REPOSITORY}:${IMAGE_TAG}")
                }
            }
        }
        stage('Login to ECR') {
            steps {
                script {
                    sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.${AWS_REGION}.amazonaws.com"
                }
            }
        }
        stage('Push to ECR') {
            steps {
                script {
                    sh "docker tag ${ECR_REPOSITORY}:${IMAGE_TAG} <aws_account_id>.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}"
                    sh "docker push <aws_account_id>.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}"
                }
            }
        }
    }
}