
data "template_file" "s3-webpage-policy"{
  template= "${file("s3-policy/website.json")}"
  vars = {
      project_name = "${var.project_name}"
  }
}


data "template_file" "s3-files-policy"{
  template= "${file("s3-policy/files.json")}"
  vars = {
      project_name = "${var.project_name}"
  }
}

resource "aws_s3_bucket" "webpage" {
  bucket = "${var.project_name}-web"
  acl    = "public-read"
  policy = "${data.template_file.s3-webpage-policy.rendered}"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket" "files" {
  bucket = "${var.project_name}-files"
  acl    = "public-read"
  policy = "${data.template_file.s3-files-policy.rendered}"

}