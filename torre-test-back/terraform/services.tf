resource "aws_ecs_service" "ecs-service-auth" {
  name            = "${var.project-name}-service-auth"
  cluster         = "${aws_ecs_cluster.ecs-cluster.id}"
  task_definition = "${aws_ecs_task_definition.task-auth.arn}"
  desired_count   = 0
  iam_role = "${aws_iam_role.ecsServiceRole.arn}"
  depends_on      = ["aws_iam_role.ecsServiceRole"]
  deployment_maximum_percent  = 200
  deployment_minimum_healthy_percent = 50

  lifecycle {
    ignore_changes = ["desired_count"]
  }

  ordered_placement_strategy {
    type  = "binpack"
  }

  load_balancer {
    target_group_arn = "${aws_lb_target_group.auth-tg.arn}"
    container_name = "${var.project-name}-container-auth}"
    container_port   = 8082
  }
}

resource "aws_ecs_service" "ecs-service-bestOption" {
  name            = "${var.project-name}-service-bestOption"
  cluster         = "${aws_ecs_cluster.ecs-cluster.id}"
  task_definition = "${aws_ecs_task_definition.task-bestOption.arn}"
  desired_count   = 0
  iam_role = "${aws_iam_role.ecsServiceRole.arn}"
  depends_on      = ["aws_iam_role.ecsServiceRole"]
  deployment_maximum_percent  = 200
  deployment_minimum_healthy_percent = 50

  lifecycle {
    ignore_changes = ["desired_count"]
  }

  ordered_placement_strategy {
    type  = "binpack"
  }

  load_balancer {
    target_group_arn = "${aws_lb_target_group.bestOption-tg.arn}"
    container_name = "${var.project-name}-container-bestOption}"
    container_port   = 8086
  }
}

resource "aws_ecs_service" "ecs-service-companies" {
  name            = "${var.project-name}-service-companies"
  cluster         = "${aws_ecs_cluster.ecs-cluster.id}"
  task_definition = "${aws_ecs_task_definition.task-companies.arn}"
  desired_count   = 0
  iam_role = "${aws_iam_role.ecsServiceRole.arn}"
  depends_on      = ["aws_iam_role.ecsServiceRole"]
  deployment_maximum_percent  = 200
  deployment_minimum_healthy_percent = 50

  lifecycle {
    ignore_changes = ["desired_count"]
  }

  ordered_placement_strategy {
    type  = "binpack"
  }

  load_balancer {
    target_group_arn = "${aws_lb_target_group.companies-tg.arn}"
    container_name = "${var.project-name}-container-companies}"
    container_port   = 8083
  }
}

resource "aws_ecs_service" "ecs-service-emails" {
  name            = "${var.project-name}-service-emails"
  cluster         = "${aws_ecs_cluster.ecs-cluster.id}"
  task_definition = "${aws_ecs_task_definition.task-emails.arn}"
  desired_count   = 0
  iam_role = "${aws_iam_role.ecsServiceRole.arn}"
  depends_on      = ["aws_iam_role.ecsServiceRole"]
  deployment_maximum_percent  = 200
  deployment_minimum_healthy_percent = 50

  lifecycle {
    ignore_changes = ["desired_count"]
  }

  ordered_placement_strategy {
    type  = "binpack"
  }

  load_balancer {
    target_group_arn = "${aws_lb_target_group.emails-tg.arn}"
    container_name = "${var.project-name}-container-emails}"
    container_port   = 8088
  }
}

resource "aws_ecs_service" "ecs-service-invoices" {
  name            = "${var.project-name}-service-invoices"
  cluster         = "${aws_ecs_cluster.ecs-cluster.id}"
  task_definition = "${aws_ecs_task_definition.task-invoices.arn}"
  desired_count   = 0
  iam_role = "${aws_iam_role.ecsServiceRole.arn}"
  depends_on      = ["aws_iam_role.ecsServiceRole"]
  deployment_maximum_percent  = 200
  deployment_minimum_healthy_percent = 50

  lifecycle {
    ignore_changes = ["desired_count"]
  }

  ordered_placement_strategy {
    type  = "binpack"
  }

  load_balancer {
    target_group_arn = "${aws_lb_target_group.invoices-tg.arn}"
    container_name = "${var.project-name}-container-invoices}"
    container_port   = 8080
  }
}

resource "aws_ecs_service" "ecs-service-history" {
  name            = "${var.project-name}-service-history"
  cluster         = "${aws_ecs_cluster.ecs-cluster.id}"
  task_definition = "${aws_ecs_task_definition.task-history.arn}"
  desired_count   = 0
  iam_role = "${aws_iam_role.ecsServiceRole.arn}"
  depends_on      = ["aws_iam_role.ecsServiceRole"]
  deployment_maximum_percent  = 200
  deployment_minimum_healthy_percent = 50

  lifecycle {
    ignore_changes = ["desired_count"]
  }

  ordered_placement_strategy {
    type  = "binpack"
  }

  load_balancer {
    target_group_arn = "${aws_lb_target_group.history-tg.arn}"
    container_name = "${var.project-name}-container-history}"
    container_port   = 8087
  }
}

resource "aws_ecs_service" "ecs-service-offers" {
  name            = "${var.project-name}-service-offers"
  cluster         = "${aws_ecs_cluster.ecs-cluster.id}"
  task_definition = "${aws_ecs_task_definition.task-offers.arn}"
  desired_count   = 0
  iam_role = "${aws_iam_role.ecsServiceRole.arn}"
  depends_on      = ["aws_iam_role.ecsServiceRole"]
  deployment_maximum_percent  = 200
  deployment_minimum_healthy_percent = 50

  lifecycle {
    ignore_changes = ["desired_count"]
  }

  ordered_placement_strategy {
    type  = "binpack"
  }

  load_balancer {
    target_group_arn = "${aws_lb_target_group.offers-tg.arn}"
    container_name = "${var.project-name}-container-offers}"
    container_port   = 8081
  }
}

resource "aws_ecs_service" "ecs-service-offersBags" {
  name            = "${var.project-name}-service-offersBags"
  cluster         = "${aws_ecs_cluster.ecs-cluster.id}"
  task_definition = "${aws_ecs_task_definition.task-offersBags.arn}"
  desired_count   = 0
  iam_role = "${aws_iam_role.ecsServiceRole.arn}"
  depends_on      = ["aws_iam_role.ecsServiceRole"]
  deployment_maximum_percent  = 200
  deployment_minimum_healthy_percent = 50

  lifecycle {
    ignore_changes = ["desired_count"]
  }

  ordered_placement_strategy {
    type  = "binpack"
  }

  load_balancer {
    target_group_arn = "${aws_lb_target_group.offersBags-tg.arn}"
    container_name = "${var.project-name}-container-offersBags}"
    container_port   = 8084
  }
}

resource "aws_ecs_service" "ecs-service-tradingBags" {
  name            = "${var.project-name}-service-tradingBags"
  cluster         = "${aws_ecs_cluster.ecs-cluster.id}"
  task_definition = "${aws_ecs_task_definition.task-tradingBags.arn}"
  desired_count   = 0
  iam_role = "${aws_iam_role.ecsServiceRole.arn}"
  depends_on      = ["aws_iam_role.ecsServiceRole"]
  deployment_maximum_percent  = 200
  deployment_minimum_healthy_percent = 50

  lifecycle {
    ignore_changes = ["desired_count"]
  }

  ordered_placement_strategy {
    type  = "binpack"
  }

  load_balancer {
    target_group_arn = "${aws_lb_target_group.tradingBags-tg.arn}"
    container_name = "${var.project-name}-container-tradingBags}"
    container_port   = 8085
  }
}
