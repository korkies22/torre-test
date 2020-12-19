data "aws_vpc" "defaut" { //Default VPC
  default = true
}

data "template_file" "user-data"{
  template= "${file("user-data.txt")}"

  vars = {
      ecs_cluster = "${var.cluster-name}"
  }
}

data "aws_subnet_ids" "subnet_ids" {
  vpc_id = data.aws_vpc.defaut.id
}
data "aws_subnet" "subnet" {
  count = "${length(data.aws_subnet_ids.subnet_ids.ids)}"
  id    = "${tolist(data.aws_subnet_ids.subnet_ids.ids)[count.index]}"
}

data "aws_iam_policy" "AmazonEC2ContainerServiceRole" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceRole"
}

data "aws_iam_policy" "CloudWatchLogsFullAccess" {
  arn = "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess"
}

data "aws_iam_policy" "AmazonECSTaskExecutionRolePolicy" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}