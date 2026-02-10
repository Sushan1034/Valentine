pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred') // your Jenkins DockerHub credential ID
        IMAGE_NAME = 'kjbsdfbuhsdbfu/valentineee'
        IMAGE_TAG = 'latest'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Sushan1034/Valentine.git'
            }
        }

        stage('Build Project') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        echo 'Node project detected, installing dependencies...'
                        bat 'npm install'
                        bat 'npm run build || echo "No build script, skipping"'
                    } else {
                        echo 'Static project detected, skipping build'
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Docker Login & Push') {
            steps {
                bat "docker login -u %DOCKERHUB_CREDENTIALS_USR% -p %DOCKERHUB_CREDENTIALS_PSW%"
                bat "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }
    }

    post {
        success { echo ' Pipeline completed successfully!' }
        failure { echo ' Pipeline failed!' }
    }
}
