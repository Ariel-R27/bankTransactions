resource "aws_ecs_cluster" "main" {
  name = "banking-microservices-cluster"
}

resource "aws_ecs_service" "core_service" {
    name = "core-service"
    cluster = aws_ecs_cluster.main.id
    task_definition = aws_ecs_task_definition.core_service.arn
    launch_type = "FARGATE"
    desired_count = 1

    network_configuration {
      subnets = [aws_subnet.public_subnet.id]
      security_groups = [aws_security_group.ecs_service_sg.id]
      assign_public_ip = true
    }

    depends_on = [ 
        aws_iam_role_policy_attachment.ecs_task_execution_role_policy
    ]
}

resource "aws_ecs_service" "user_service" {
    name = "user-service"
    cluster = aws_ecs_cluster.main.id
    task_definition = aws_ecs_task_definition.user_service.arn
    launch_type = "FARGATE"
    desired_count = 1

    network_configuration {
      subnets = [aws_subnet.public_subnet.id]
      security_groups = [aws_security_group.ecs_service_sg.id]
      assign_public_ip = true
    }

    depends_on = [ 
        aws_iam_role_policy_attachment.ecs_task_execution_role_policy
    ]
}

resource "aws_ecs_service" "account_service" {
    name = "account-service"
    cluster = aws_ecs_cluster.main.id
    task_definition = aws_ecs_task_definition.account_service.arn
    launch_type = "FARGATE"
    desired_count = 1

    network_configuration {
      subnets = [aws_subnet.public_subnet.id]
      security_groups = [aws_security_group.ecs_service_sg.id]
      assign_public_ip = true
    }

    depends_on = [ 
        aws_iam_role_policy_attachment.ecs_task_execution_role_policy
    ]
}