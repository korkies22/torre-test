resource "aws_ecs_capacity_provider" "ecs-capacity-provider" {
  name =  "${var.project-name}-cp"

  auto_scaling_group_provider {
    auto_scaling_group_arn         = aws_autoscaling_group.ecs-autoscaling.arn
    managed_termination_protection = "ENABLED"

    managed_scaling {
      status                    = "ENABLED"
      target_capacity           = 75
    }
  }

  tags = {
    Name = "${var.project-name}"
  }
}

resource "aws_ecs_cluster" "ecs-cluster" {
  name = "${var.project-name}-cluster"
  default_capacity_provider_strategy {
    capacity_provider= "${var.project-name}-cp"
  }

  tags = {
    Name = "${var.project-name}"
  }
}