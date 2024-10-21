import React from 'react';
import { Typography, Link, Container, Grid, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const StyledFooter = styled('footer')(() => ({
  backgroundColor: '#f8f9fb',
  color: '#333',
  padding: '48px 0 0',
  marginTop: 'auto',
  borderTop: '1px solid #e0e0e0',
}));

const FooterLink = styled(Link)(() => ({
  color: '#333',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const SocialIcon = styled(IconButton)(() => ({
  color: '#333',
  '&:hover': {
    color: '#000',
  },
}));

const CopyrightBox = styled(Box)(() => ({
  backgroundColor: '#e0e0e0',
  padding: '16px 0',
  marginTop: '48px',
}));

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={3}>
            <Box mb={2}>
              <Image src="https://di8mcd92ly4ww.cloudfront.net/Beta.png" alt="Gruby Logo" width={120} height={40} />
            </Box>
            <Typography variant="body2" mb={2}>
              Connecting food lovers with talented chefs.
            </Typography>
            <Box>
              <SocialIcon aria-label="facebook">
                <Facebook />
              </SocialIcon>
              <SocialIcon aria-label="twitter">
                <Twitter />
              </SocialIcon>
              <SocialIcon aria-label="instagram">
                <Instagram />
              </SocialIcon>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <FooterLink href="/about">About Us</FooterLink>
            </Box>
            <Box>
              <FooterLink href="/faq">FAQ</FooterLink>
            </Box>
            <Box>
              <FooterLink href="/contact">Contact</FooterLink>
            </Box>
            <Box>
              <FooterLink href="/chefs">Find a Chef</FooterLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Box>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </Box>
            <Box>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </Box>
            <Box>
              <FooterLink href="/cookies">Cookie Policy</FooterLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" mb={2}>
              Stay updated with our latest offers and chef stories.
            </Typography>
            <Box component="form" noValidate>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Subscribe
              </button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <CopyrightBox>
        <Typography variant="body2" color="textSecondary" align="center">
          &copy; {new Date().getFullYear()} Gruby. All rights reserved.
        </Typography>
      </CopyrightBox>
    </StyledFooter>
  );
};

export default Footer;
