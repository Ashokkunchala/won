/// this is a Jenkinsfile to push image to ECR
pipeline {
    agent any

    options {
        skipDefaultCheckout()
    }

    environment {
        AWS_ACCOUNT_ID = '381492115031'
        AWS_REGION = 'us-east-1'
        ECR_REPOSITORY = 'my-node-repo'
        IMAGE_TAG = "v1.0-${BUILD_NUMBER}"
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: env.BRANCH_NAME ?: 'main', credentialsId: 'Git-cred', url: 'https://github.com/Ashokkunchala/won.git'
                echo 'Git checkout is done.'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t "${ECR_REPOSITORY}:${IMAGE_TAG}" .'
                echo 'Docker image built successfully.'
            }
        }
        
        stage('Image Scan with trivy') {
            steps {
                sh '''++
                    trivy image --exit-code 0 --severity HIGH,CRITICAL "${ECR_REPOSITORY}:${IMAGE_TAG}"
                '''
                echo 'Docker image scanned successfully.'
            }
        }
        stage('Authenticate with ECR') {
            steps {
                sh '''
                    aws ecr get-login-password --region "${AWS_REGION}" \
                        | docker login --username AWS --password-stdin "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
                '''
                echo 'Authenticated with ECR successfully.'
            }
        }

        stage('Push to ECR') {
            steps {
                sh '''
                    aws ecr get-login-password --region "${AWS_REGION}" \
                        | docker login --username AWS --password-stdin "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

                    docker tag "${ECR_REPOSITORY}:${IMAGE_TAG}" "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}"
                    docker push "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}"
                '''
                echo 'Docker image pushed to ECR successfully.'
            }
        }
    }
}
