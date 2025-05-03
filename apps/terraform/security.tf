resource "aws_security_group" "ecs_service_sg" {
    name = "ecs-service-sg"
    description = "Allos HTTP and custom ports for ECS services"
    vpc_id = aws_vpc.main.id

    ingress {
        description = "Allow HTTP"
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        description = "Allow custom ports (3000-3002)"
        from_port = 3000
        to_port = 3002
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        description = "Allow all outbound"
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = "ecs-service-sg"
    }
}



