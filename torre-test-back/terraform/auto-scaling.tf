resource "aws_launch_template" "ecs-launch" {
  name_prefix   = "${var.project-name}-lt-"
  image_id      = var.ec2-id
  instance_type = var.instance-type
  key_name = "${var.project-name}-kp"
  user_data = base64encode(data.template_file.user-data.rendered)

  vpc_security_group_ids = ["${aws_security_group.allow-ssh.id}","${aws_security_group.allow-microservices.id}"]
}

resource "aws_autoscaling_group" "ecs-autoscaling" {
  name     = "${var.project-name}-au" 
  max_size                  = 0
  min_size                  = 0
  health_check_grace_period = 10

  protect_from_scale_in= true
  
  launch_template {
    id    = aws_launch_template.ecs-launch.id
    version = "$Latest"
  }

  vpc_zone_identifier  = data.aws_subnet.subnet.*.id

  tag = {
    Name = "${var.project-name}"
  }
}
