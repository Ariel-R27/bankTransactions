output "core_service_url" {
  description = "Public URL del microservicio core-service"
  value = "http://${aws_lb.main.dns_name}/core"
}

output "user_service_url" {
  description = "Public URL del microservicio user-service"
  value = "http://${aws_lb.main.dns_name}/user"
}

output "account_service_url" {
  description = "Public URL del microservicio account-service"
  value = "http://${aws_lb.main.dns_name}/account"
}
