resource "aws_lb_target_group" "auth-tg" {
  name  = "${var.project-name}-auth-tg"
  port        = 8082
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id      = "${data.aws_vpc.default.id}"
}

resource "aws_lb_target_group" "bestOption-tg" {
  name  = "${var.project-name}-bestOption-tg"
  port        = 8086
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id      = "${data.aws_vpc.default.id}"
}

resource "aws_lb_target_group" "companies-tg" {
  name  = "${var.project-name}-companies-tg"
  port        = 8083
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id      = "${data.aws_vpc.default.id}"
}

resource "aws_lb_target_group" "emails-tg" {
  name  = "${var.project-name}-emails-tg"
  port        = 8088
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id      = "${data.aws_vpc.default.id}"
}

resource "aws_lb_target_group" "invoices-tg" {
  name  = "${var.project-name}-invoices-tg"
  port        = 8080
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id      = "${data.aws_vpc.default.id}"
}

resource "aws_lb_target_group" "history-tg" {
  name  = "${var.project-name}-history-tg"
  port        = 8087
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id      = "${data.aws_vpc.default.id}"
}

resource "aws_lb_target_group" "offers-tg" {
  name  = "${var.project-name}-offers-tg"
  port        = 8081
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id      = "${data.aws_vpc.default.id}"
}


resource "aws_lb_target_group" "offersBags-tg" {
  name  = "${var.project-name}-offersBags-tg"
  port        = 8084
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id      = "${data.aws_vpc.default.id}"
}



resource "aws_lb_target_group" "tradingBags-tg" {
  name  = "${var.project-name}-tradingBags-tg"
  port        = 8085
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id      = "${data.aws_vpc.default.id}"
}


