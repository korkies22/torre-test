//Auth
data "template_file" "container-auth"{
  template= "${file("task-definitions/auth.json")}"

  vars = {
      project_name = "${var.project_name}"
      repository_url = "${aws_ecr_repository.ecr-auth.repository_url}"
  }
}
resource "aws_ecs_task_definition" "task-auth" {
  family                = "${var.project-name}-task-auth"
  container_definitions = "${data.template_file.container-auth.rendered}"
  task_role_arn = "${aws_iam_role.ecsTaskExecutionRole.arn}"
  requires_compatibilities = "EC2"
}
//BestOption
data "template_file" "container-bestOption"{
  template= "${file("task-definitions/bestOption.json")}"

  vars = {
      project_name = "${var.project_name}"
      repository_url = "${aws_ecr_repository.ecr-bestoption.repository_url}"
  }
}
resource "aws_ecs_task_definition" "task-bestOption" {
  family                = "${var.project-name}-task-bestOption"
  container_definitions = "${data.template_file.container-bestOption.rendered}"
  task_role_arn = "${aws_iam_role.ecsTaskExecutionRole.arn}"
  requires_compatibilities = "EC2"
}
//Companies
data "template_file" "container-companies"{
  template= "${file("task-definitions/companies.json")}"

  vars = {
      project_name = "${var.project_name}"
      repository_url = "${aws_ecr_repository.ecr-companies.repository_url}"
  }
}
resource "aws_ecs_task_definition" "task-companies" {
  family                = "${var.project-name}-task-companies"
  container_definitions = "${data.template_file.container-companies.rendered}"
  task_role_arn = "${aws_iam_role.ecsTaskExecutionRole.arn}"
  requires_compatibilities = "EC2"
}
//DailyEmails
data "template_file" "container-daily-emails"{
  template= "${file("task-definitions/dailyEmails.json")}"

  vars = {
      project_name = "${var.project_name}"
      repository_url = "${aws_ecr_repository.ecr-daily-emails.repository_url}"
  }
}
resource "aws_ecs_task_definition" "task-daily-emails" {
  family                = "${var.project-name}-task-daily-emails"
  container_definitions = "${data.template_file.container-daily-emails.rendered}"
  task_role_arn = "${aws_iam_role.ecsTaskExecutionRole.arn}"
  requires_compatibilities = "FARGATE"
  cpu = 1
  memory = 512
}
//Emails
data "template_file" "container-emails"{
  template= "${file("task-definitions/emails.json")}"

  vars = {
      project_name = "${var.project_name}"
      repository_url = "${aws_ecr_repository.ecr-emails.repository_url}"
  }
}
resource "aws_ecs_task_definition" "task-emails" {
  family                = "${var.project-name}-task-emails"
  container_definitions = "${data.template_file.container-emails.rendered}"
  task_role_arn = "${aws_iam_role.ecsTaskExecutionRole.arn}"
  requires_compatibilities = "EC2"
}
//ExpirationVerifier
data "template_file" "container-expiration-verifier"{
  template= "${file("task-definitions/expirationVerifier.json")}"

  vars = {
      project_name = "${var.project_name}"
      repository_url = "${aws_ecr_repository.ecr-expiration-verifier.repository_url}"
  }
}
resource "aws_ecs_task_definition" "task-expiration-verifier" {
  family                = "${var.project-name}-task-expiration-verifier"
  container_definitions = "${data.template_file.container-expiration-verifier.rendered}"
  task_role_arn = "${aws_iam_role.ecsTaskExecutionRole.arn}"
  requires_compatibilities = "FARGATE"
  cpu = 1
  memory = 512
}
//History
data "template_file" "container-history"{
  template= "${file("task-definitions/history.json")}"

  vars = {
      project_name = "${var.project_name}"
      repository_url = "${aws_ecr_repository.ecr-history.repository_url}"
  }
}
resource "aws_ecs_task_definition" "task-history" {
  family                = "${var.project-name}-task-history"
  container_definitions = "${data.template_file.container-history.rendered}"
  task_role_arn = "${aws_iam_role.ecsTaskExecutionRole.arn}"
  requires_compatibilities = "EC2"
}
//Invoices
data "template_file" "container-invoices"{
  template= "${file("task-definitions/invoices.json")}"

  vars = {
      project_name = "${var.project_name}"
      repository_url = "${aws_ecr_repository.ecr-invoices.repository_url}"
  }
}
resource "aws_ecs_task_definition" "task-invoices" {
  family                = "${var.project-name}-task-invoices"
  container_definitions = "${data.template_file.container-invoices.rendered}"
  task_role_arn = "${aws_iam_role.ecsTaskExecutionRole.arn}"
  requires_compatibilities = "EC2"
}
//Offers
data "template_file" "container-offers"{
  template= "${file("task-definitions/offers.json")}"

  vars = {
      project_name = "${var.project_name}"
      repository_url = "${aws_ecr_repository.ecr-offers.repository_url}"
  }
}
resource "aws_ecs_task_definition" "task-offers" {
  family                = "${var.project-name}-task-offers"
  container_definitions = "${data.template_file.container-offers.rendered}"
  task_role_arn = "${aws_iam_role.ecsTaskExecutionRole.arn}"
  requires_compatibilities = "EC2"
}

//OffersBags
data "template_file" "container-offers-bags"{
  template= "${file("task-definitions/offersBags.json")}"

  vars = {
      project_name = "${var.project_name}"
      repository_url = "${aws_ecr_repository.ecr-offersbags.repository_url}"
  }
}
resource "aws_ecs_task_definition" "task-history" {
  family                = "${var.project-name}-task-offersBags"
  container_definitions = "${data.template_file.container-offers-bags.rendered}"
  task_role_arn = "${aws_iam_role.ecsTaskExecutionRole.arn}"
  requires_compatibilities = "EC2"
}

//TradingBags
data "template_file" "container-trading-bags"{
  template= "${file("task-definitions/tradingBags.json")}"

  vars = {
      project_name = "${var.project_name}"
      repository_url = "${aws_ecr_repository.ecr-tradingbags.repository_url}"
  }
}
resource "aws_ecs_task_definition" "task-trading-bags" {
  family                = "${var.project-name}-task-trading-bags"
  container_definitions = "${data.template_file.container-trading-bags.rendered}"
  task_role_arn = "${aws_iam_role.ecsTaskExecutionRole.arn}"
  requires_compatibilities = "EC2"
}