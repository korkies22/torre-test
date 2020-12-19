
resource "aws_ecr_repository" "ecr-auth" {
  name  = "${var.project-name}-ecr-auth"

  tags = {
        Name = "${var.project-name}"
    }
}

resource "aws_ecr_repository" "ecr-bestoption" {
  name  = "${var.project-name}-ecr-bestoption"

  tags = {
        Name = "${var.project-name}"
    }
}


resource "aws_ecr_repository" "ecr-companies" {
  name  = "${var.project-name}-ecr-companies"

  tags = {
        Name = "${var.project-name}"
    }
}

resource "aws_ecr_repository" "ecr-daily-emails" {
  name  = "${var.project-name}-ecr-daily-emails"

  tags = {
        Name = "${var.project-name}"
    }
}

resource "aws_ecr_repository" "ecr-emails" {
  name  = "${var.project-name}-ecr-emails"

  tags = {
        Name = "${var.project-name}"
    }
}

resource "aws_ecr_repository" "ecr-expiration-verifier" {
  name  = "${var.project-name}-ecr-expiration-verifier"

  tags = {
        Name = "${var.project-name}"
    }
}

resource "aws_ecr_repository" "ecr-history" {
  name  = "${var.project-name}-ecr-history"

  tags = {
        Name = "${var.project-name}"
    }
}

resource "aws_ecr_repository" "ecr-invoices" {
  name  = "${var.project-name}-ecr-invoices"

  tags = {
        Name = "${var.project-name}"
    }
}

resource "aws_ecr_repository" "ecr-offers" {
  name  = "${var.project-name}-ecr-offers"

  tags = {
        Name = "${var.project-name}"
    }
}

resource "aws_ecr_repository" "ecr-offersbags" {
  name  = "${var.project-name}-ecr-offersbags"

  tags = {
        Name = "${var.project-name}"
    }
}

resource "aws_ecr_repository" "ecr-tradingbags" {
  name  = "${var.project-name}-ecr-tradingbags"

  tags = {
        Name = "${var.project-name}"
    }
}