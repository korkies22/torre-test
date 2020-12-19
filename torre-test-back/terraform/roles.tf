resource "aws_iam_role" "ecsServiceRole" {
  name = "${var.project-name}-service-role"
}

resource "aws_iam_role_policy_attachment" "AmazonEC2ContainerServiceRole" {
  role       = "${aws_iam_role.ecsServiceRole.name}"
  policy_arn = "${data.aws_iam_policy.AmazonEC2ContainerServiceRole.arn}"
}


resource "aws_iam_role" "ecsTaskExecutionRole" {
  name = "${var.project-name}-task-role"
}

resource "aws_iam_role_policy_attachment" "AmazonECSTaskExecutionRolePolicy" {
  role       = "${aws_iam_role.ecsTaskExecutionRole.name}"
  policy_arn = "${data.aws_iam_policy.AmazonECSTaskExecutionRolePolicy.arn}"
}