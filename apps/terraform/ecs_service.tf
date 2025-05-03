resource "aws_ecs_service" "core_service" {
  name            = "core-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.core_service.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets          = [aws_subnet.public_subnet.id]
    security_groups  = [aws_security_group.ecs_service_sg.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.core_service_tg.arn
    container_name   = "core-service"
    container_port   = 3000
  }

  depends_on = [ aws_lb_listener.core_service_listener ]
}

resource "aws_ecs_service" "user_service" {
  name            = "user-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.user_service.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets          = [aws_subnet.public_subnet.id]
    security_groups  = [aws_security_group.ecs_service_sg.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.user_service_tg.arn
    container_name   = "user-service"
    container_port   = 3001
  }

  depends_on = [ aws_lb_listener.user_service_listener ]
}

resource "aws_ecs_service" "account_service" {
  name            = "account-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.account_service.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets          = [aws_subnet.public_subnet.id]
    security_groups  = [aws_security_group.ecs_service_sg.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.account_service_tg.arn
    container_name   = "account-service"
    container_port   = 3002
  }

  depends_on = [ aws_lb_listener.account_service_listener ]
}

