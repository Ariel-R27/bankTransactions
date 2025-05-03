resource "aws_lb" "main" {
    name = "banking-alb"
    internal = false
    load_balancer_type = "application"
    security_groups = [aws_security_group.ecs_service_sg.id]
    subnets = [aws_subnet.public_subnet.id]

    enable_deletion_protection = false

    tags = {
        Name = "banking-alb"
    }
}

resource "aws_lb_target_group" "core_service_tg" {
    name = "core-service-tg"
    port = 3000
    protocol = "HTTP"
    vpc_id = aws_vpc.main.id
    target_type = "ip"

    health_check {
      path = "/"
      interval = 30
      timeout = 5
      healthy_threshold = 2
      unhealthy_threshold = 3
      matcher = "200"
    }

    tags = {
        Name = "core-service-target-group"
    }
}

resource "aws_lb_listener" "core_service_listener" {
    load_balancer_arn = aws_lb.main.arn
    port = 80
    protocol = "HTTP"

    default_action {
      type = "forward"
      target_group_arn = aws_lb_target_group.core_service_tg.arn
    } 
}

resource "aws_lb_target_group" "user_service_tg" {
    name = "user-service-tg"
    port = 3001
    protocol = "HTTP"
    vpc_id = aws_vpc.main.id
    target_type = "ip"

    health_check {
      path = "/"
      interval = 30
      timeout = 5
      healthy_threshold = 2
      unhealthy_threshold = 3
      matcher = "200"
    }

    tags = {
        Name = "user-service-target-group"
    }
}

resource "aws_lb_listener" "user_service_listener" {
    load_balancer_arn = aws_lb.main.arn
    port = 80
    protocol = "HTTP"

    default_action {
      type = "forward"
      target_group_arn = aws_lb_target_group.user_service_tg.arn
    } 
}

resource "aws_lb_target_group" "account_service_tg" {
    name = "account-service-tg"
    port = 3002
    protocol = "HTTP"
    vpc_id = aws_vpc.main.id
    target_type = "ip"

    health_check {
      path = "/"
      interval = 30
      timeout = 5
      healthy_threshold = 2
      unhealthy_threshold = 3
      matcher = "200"
    }

    tags = {
        Name = "account-service-target-group"
    }
}

resource "aws_lb_listener" "account_service_listener" {
    load_balancer_arn = aws_lb.main.arn
    port = 80
    protocol = "HTTP"

    default_action {
      type = "forward"
      target_group_arn = aws_lb_target_group.account_service_tg.arn
    } 
}
