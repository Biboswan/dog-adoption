"use client"

import { useForm } from "react-hook-form";
import { redirect } from 'next/navigation';
import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Heading,
  Box,
  Input,
  Button,
  Stack,
  Field,
} from "@chakra-ui/react";
import { login } from "@/app/lib/api/auth";
import { AppContext } from "../providers/app-provider";
import { use } from "react";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
  });

type FormValues = z.infer<typeof schema>;

const Container = styled.div`
  width: 400px;
`;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(schema)
    });

  const { setUser } = use(AppContext);

  const onSubmit = async ({name,email}: FormValues) => {
    await login(email, name);
    setUser({email, name});
    redirect('/');
  };

  return (
    <>
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Container>
        <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }}>
          <Heading textAlign='center'>Welcome to the Dog Adoption App</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }}>
              {/* Name Field */}
              <Field.Root invalid={!!errors.name}>
                  <Field.Label>Name</Field.Label>
                  <Input type="text"
                  {...register("name")} />
                  <Field.ErrorText>error</Field.ErrorText>
          </Field.Root>

              {/* Email Field */}
              <Field.Root invalid={!!errors.email}>
              <Field.Label>Email</Field.Label>
              <Input
                  type="email"
                  {...register("email")}
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>

              <Button disabled={!isValid} loading={isSubmitting} type="submit">
              Login
              </Button>
              </Stack>
          </form>
          </Stack>
        </Container>
    </Box>
    </>
  );
}
