resource "aws_lb" "application-load-balancer" {
  name  = "${var.project-name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = ["${aws_security_group.allow-http.id}"]
  subnets            = ["${aws_subnet.subnet.*.id}"]

  enable_deletion_protection = true

  tags = {
    Name = "${var.project-name}"
  }
}

resource "aws_lb_listener" "application-load-balancer-listener" {
  load_balancer_arn = "${aws_lb.application-load-balancer.arn}"
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.invoices-tg.arn}"
  }
}

resource "aws_lb_listener_rule" "lb-listener-offersBags-bags" {
  listener_arn = "${aws_lb_listener.application-load-balancer-listener.arn}"

  action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.offersBags-tg.arn}"
  }

  condition {
    path_pattern {
      values = ["/api/offersBags*"]
    }
  }
}

resource "aws_lb_listener_rule" "lb-listener-offers" {
  listener_arn = "${aws_lb_listener.application-load-balancer-listener.arn}"

  action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.offers-tg.arn}"
  }

  condition {
    path_pattern {
      values = ["/api/offers*"]
    }
  }
}

resource "aws_lb_listener_rule" "lb-listener-invoices" {
  listener_arn = "${aws_lb_listener.application-load-balancer-listener.arn}"

  action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.invoices-tg.arn}"
  }

  condition {
    path_pattern {
      values = ["/api/invoices*"]
    }
  }
}


resource "aws_lb_listener_rule" "lb-listener-auth" {
  listener_arn = "${aws_lb_listener.application-load-balancer-listener.arn}"

  action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.auth-tg.arn}"
  }

  condition {
    path_pattern {
      values = ["/api/auth*"]
    }
  }
}

resource "aws_lb_listener_rule" "lb-listener-companies" {
  listener_arn = "${aws_lb_listener.application-load-balancer-listener.arn}"

  action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.companies-tg.arn}"
  }

  condition {
    path_pattern {
      values = ["/api/companies*"]
    }
  }
}

resource "aws_lb_listener_rule" "lb-listener-tradingBags" {
  listener_arn = "${aws_lb_listener.application-load-balancer-listener.arn}"

  action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.tradingBags-tg.arn}"
  }

  condition {
    path_pattern {
      values = ["/api/tradingBags*"]
    }
  }
}

resource "aws_lb_listener_rule" "lb-listener-bestOption" {
  listener_arn = "${aws_lb_listener.application-load-balancer-listener.arn}"

  action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.bestOption-tg.arn}"
  }

  condition {
    path_pattern {
      values = ["/api/bestOption*"]
    }
  }
}


resource "aws_lb_listener_rule" "lb-listener-history" {
  listener_arn = "${aws_lb_listener.application-load-balancer-listener.arn}"

  action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.history-tg.arn}"
  }

  condition {
    path_pattern {
      values = ["/api/history*"]
    }
  }
}

resource "aws_lb_listener_rule" "lb-listener-emails" {
  listener_arn = "${aws_lb_listener.application-load-balancer-listener.arn}"

  action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.emails-tg.arn}"
  }

  condition {
    path_pattern {
      values = ["/api/emails*"]
    }
  }
}

resource "aws_lb_listener_rule" "lb-listener-companies" {
  listener_arn = "${aws_lb_listener.application-load-balancer-listener.arn}"

  action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.companies-tg.arn}"
  }

  condition {
    path_pattern {
      values = ["/api/companies*"]
    }
  }
}