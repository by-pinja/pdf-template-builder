library 'jenkins-ptcs-library@0.2.5'

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
            npm test
          """
        }
      }
    }
    catch (e) {
      currentBuild.result = 'FAILED'
      throw e
    }
  }
}
