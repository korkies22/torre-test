resource "aws_security_group" "allow-ssh" {
  name        = "${var.project-name}-allow-ssh"
  description = "Allow SSH"
  vpc_id      = data.aws_vpc.defaut.id


ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project-name}"
  }
}

resource "aws_security_group" "allow-microservices" {
  name        = "${var.project-name}-allow-microservices"
  description = "Allow Microservices"
  vpc_id      = data.aws_vpc.defaut.id


ingress {
    from_port   = 8080
    to_port     = 8090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project-name}"
  }
}

resource "aws_security_group" "allow-http" {
  name        = "${var.project-name}-allow-http"
  description = "Allow HTTP port"
  vpc_id      = data.aws_vpc.defaut.id


ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project-name}"
  }
}

resource "aws_security_group" "allow-https" {
  name        = "${var.project-name}-allow-https"
  description = "Allow HTTPS port"
  vpc_id      = data.aws_vpc.defaut.id


ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project-name}"
  }
}