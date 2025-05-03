variable "aws_region" {
    description = "Region donde se desplegara la infraestrcutrua"
    type = string
    default = "us-east-1"
}

variable "aws_profile" {
  description = "Perfil de AWS CLI a utilizar"
  type = string
  default = "default"
}

