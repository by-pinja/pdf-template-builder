library 'jenkins-ptcs-library@master'

podTemplate(label: pod.label,
  containers: pod.templates + [
    containerTemplate(
      name: 'node',
      image: 'node:10',
      alwaysPullImage: true,
      ttyEnabled: true,
      command: '/bin/sh -c', args: 'cat',
      resourceRequestMemory: '2200M',
    )
  ]
) {
  def project = 'pdf-template-builder'
  def branch = (env.BRANCH_NAME)

  node(pod.label) {
    try {
      stage('Checkout') {
        checkout scm
      }
      stage('Build') {
        container('node') {
          sh """
            npm install
          """
        }
      }
      stage('Test') {
        container('node') {
          sh """
            npm run test:ci
          """
        }
      }
      stage('Publish on release') {
        publishTagToNpm()
      }
      stage('Report') {
        step([
          $class: 'CloverPublisher',
          cloverReportDir: 'coverage',
          cloverReportFileName: 'clover.xml',
          healthyTarget: [methodCoverage: 100, conditionalCoverage: 80, statementCoverage: 80],
          unhealthyTarget: [methodCoverage: 45, conditionalCoverage: 45, statementCoverage: 45],
          failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]
        ])

        publishHTML(target: [
          allowMissing: false,
          alwaysLinkToLastBuild: true,
          keepAll: true,
          reportDir: 'coverage/lcov-report',
          reportFiles: 'index.html',
          reportName: 'Code Coverage',
          reportTitles: ''
        ])
      }
    }
    catch (e) {
      currentBuild.result = 'FAILED'
      throw e
    }
  }
}
