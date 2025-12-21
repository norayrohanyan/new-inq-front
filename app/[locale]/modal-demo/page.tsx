'use client';

import { useState } from 'react';
import styled from 'styled-components';
import ModalDialog from '@/components/Modal/ModalDialog';
import Button from '@/components/Button';
import { WarningIcon, ErrorIcon, SuccessIcon, SmsIcon } from '@/components/icons';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Title = styled.h1`
  color: white;
  font-size: 32px;
  margin-bottom: 20px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;

  button {
    flex: 1;
  }
`;

const SecondaryButton = styled.button`
  flex: 1;
  padding: 12px 24px;
  border: 2px solid #FF8243;
  background: transparent;
  color: white;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 130, 67, 0.1);
  }
`;

export default function ModalDemoPage() {
  const [warningOpen, setWarningOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [smsOpen, setSmsOpen] = useState(false);

  return (
    <Container>
      <Title>Modal Dialog Examples</Title>
      
      <ButtonGrid>
        <Button 
          variant="primary" 
          size="medium" 
          rounded
          onClick={() => setWarningOpen(true)}
        >
          Show Warning Modal
        </Button>
        
        <Button 
          variant="primary" 
          size="medium" 
          rounded
          onClick={() => setErrorOpen(true)}
        >
          Show Error Modal
        </Button>
        
        <Button 
          variant="primary" 
          size="medium" 
          rounded
          onClick={() => setSuccessOpen(true)}
        >
          Show Success Modal
        </Button>
        
        <Button 
          variant="primary" 
          size="medium" 
          rounded
          onClick={() => setSmsOpen(true)}
        >
          Show SMS Modal
        </Button>
      </ButtonGrid>

      {/* Warning Modal */}
      <ModalDialog
        isOpen={warningOpen}
        onClose={() => setWarningOpen(false)}
        icon={<WarningIcon />}
        title="Are you sure you want to cancel?"
        buttons={
          <ButtonWrapper>
            <Button 
              variant="primary" 
              size="medium" 
              rounded
              onClick={() => setWarningOpen(false)}
            >
              Yes
            </Button>
            <SecondaryButton onClick={() => setWarningOpen(false)}>
              No
            </SecondaryButton>
          </ButtonWrapper>
        }
      />

      {/* Error Modal */}
      <ModalDialog
        isOpen={errorOpen}
        onClose={() => setErrorOpen(false)}
        icon={<ErrorIcon />}
        title="Failed Booking"
        buttons={
          <Button 
            variant="primary" 
            size="medium" 
            rounded
            fullWidth
            onClick={() => setErrorOpen(false)}
          >
            Go back
          </Button>
        }
      />

      {/* Success Modal */}
      <ModalDialog
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        icon={<SuccessIcon />}
        title="Sign up complete!"
        buttons={
          <Button 
            variant="primary" 
            size="medium" 
            rounded
            fullWidth
            onClick={() => setSuccessOpen(false)}
          >
            Make a booking
          </Button>
        }
      />

      {/* SMS Modal */}
      <ModalDialog
        isOpen={smsOpen}
        onClose={() => setSmsOpen(false)}
        icon={<SmsIcon />}
        title="Check your sms"
      />
    </Container>
  );
}

