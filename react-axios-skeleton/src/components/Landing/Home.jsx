import { Box, Container, Link } from '@mui/material';
import * as ROUTES from "../../constants/routes";
import React from 'react'

export default function Home() {
  return (
      <Container  component="main" maxWidth="xs">
        <Box item>
          <Link href={ROUTES.SIGN_UP} variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
        <Box item>
            <Link href={ROUTES.SIGN_IN} variant="body2">
              {"Already have an account? Sign In"}
            </Link>
        </Box>
        <Box item>
          <Link href={ROUTES.Products} variant="body2">
            {"see our products"}
          </Link>
        </Box>
      </Container>
  );
}
