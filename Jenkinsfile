pipeline {
    agent { label 'worker' }

    environment {
        NODE_VERSION = '18'
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh '''
                    npm ci
                '''
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running CodeceptJS tests...'
                sh '''
                    npm test
                '''
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo 'Generating Allure report...'
                sh '''
                    npx allure generate output/allure-results --clean -o allure-report || true
                '''
            }
        }
    }

    post {
        always {
            echo 'Publishing Allure report...'
            allure([
                results: [[path: 'allure-results']],
                reportBuildPolicy: 'ALWAYS'
            ])

            echo 'Archiving test results...'
            archiveArtifacts artifacts: 'allure-results/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'output/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-report/**/*', allowEmptyArchive: true

            echo 'Cleaning workspace...'
            cleanWs(
                deleteDirs: true,
                patterns: [
                    [pattern: 'node_modules', type: 'INCLUDE'],
                    [pattern: '.npm', type: 'INCLUDE']
                ]
            )
        }
    }
}
