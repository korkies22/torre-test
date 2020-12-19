
resource "aws_appautoscaling_target" "ecs_invoices_target" {
  max_capacity       = 3
  min_capacity       = 0
  resource_id        = "service/${aws_ecs_cluster.ecs-cluster}/${var.project-name}-service-invoices"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "ecs_policy" {
  name            = "${var.project-name}-ecs-autoescaling-invoices-cpu"
  policy_type = "TargetTrackingScaling"
  resource_id        = "${aws_appautoscaling_target.ecs_invoices_target.resource_id}"
  scalable_dimension = "${aws_appautoscaling_target.ecs_invoices_target.scalable_dimension}"
  service_namespace  = "${aws_appautoscaling_target.ecs_invoices_target.service_namespace}"
  

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }

    target_value = 85
  }
}

resource "aws_appautoscaling_policy" "ecs_policy" {
  name            = "${var.project-name}-ecs-autoescaling-invoices-memory"
  policy_type = "TargetTrackingScaling"
  resource_id        = "${aws_appautoscaling_target.ecs_invoices_target.resource_id}"
  scalable_dimension = "${aws_appautoscaling_target.ecs_invoices_target.scalable_dimension}"
  service_namespace  = "${aws_appautoscaling_target.ecs_invoices_target.service_namespace}"
  

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }

    target_value = 70
  }
}