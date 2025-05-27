resource "aws_ecs_task_definition" "core_service" {
    family = "core-service-task"
    requires_compatibilities = [ "FARGATE" ]
    network_mode = "awsvpc"
    cpu = "256" # 0.25 vCPU
    memory = "512" # 512 MB
    execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
    task_role_arn = aws_iam_role.ecs_task_execution_role.arn

    container_definitions = jsonencode([
        {
            name = "core-service"
            image = "tuusuario/core-service:latest"
            essential = true
            portMappings = [
                {
                    containerPort = 3000
                    hostPort = 3000
                }
            ]
            environment = [
                { name = "DB_HOST", value = "postgres_core" },
                { name = "DB_PORT", value = "5432" },
                { name = "DB_USER", value = "postgres" },
                { name = "DB_PASSWORD", value = "postgres" },
                { name = "DB_NAME", value = "core_db" },
                { name = "PORT", value = "3000" },
            ] 
        }
    ])
}

resource "aws_ecs_task_definition" "user_service" {
    family = "user-service-task"
    requires_compatibilities = [ "FARGATE" ]
    network_mode = "awsvpc"
    cpu = "256" # 0.25 vCPU
    memory = "512" # 512 MB
    execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
    task_role_arn = aws_iam_role.ecs_task_execution_role.arn

    container_definitions = jsonencode([
        {
            name = "user-service"
            image = "tuusuario/user-service:latest"
            essential = true
            portMappings = [
                {
                    containerPort = 3001
                    hostPort = 3001
                }
            ]
            environment = [
                { name = "DB_HOST", value = "postgres_user" },
                { name = "DB_PORT", value = "5432" },
                { name = "DB_USER", value = "postgres" },
                { name = "DB_PASSWORD", value = "postgres" },
                { name = "DB_NAME", value = "user_db" },
                { name = "PORT", value = "3001" },
            ] 
        }
    ])
}

resource "aws_ecs_task_definition" "account_service" {
    family = "account-service-task"
    requires_compatibilities = [ "FARGATE" ]
    network_mode = "awsvpc"
    cpu = "256" # 0.25 vCPU
    memory = "512" # 512 MB
    execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
    task_role_arn = aws_iam_role.ecs_task_execution_role.arn

    container_definitions = jsonencode([
        {
            name = "account-service"
            image = "tuusuario/account-service:latest"
            essential = true
            portMappings = [
                {
                    containerPort = 3002
                    hostPort = 3002
                }
            ]
            environment = [
                { name = "DB_HOST", value = "postgres_account" },
                { name = "DB_PORT", value = "5432" },
                { name = "DB_USER", value = "postgres" },
                { name = "DB_PASSWORD", value = "postgres" },
                { name = "DB_NAME", value = "account_db" },
                { name = "PORT", value = "3002" },
            ] 
        }
    ])
}