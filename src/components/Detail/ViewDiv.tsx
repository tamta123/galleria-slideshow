import styled from "styled-components";
import { View } from "../../svg";
import React, { useState } from "react";

interface ViewDivProps {
  imageSrc: string;
}

const ViewDiv: React.FC<ViewDivProps> = ({ imageSrc }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <Wrapper onClick={openModal}>
        <View />
        <ViewImage>VIEW IMAGE</ViewImage>
      </Wrapper>
      {modalOpen && (
        <ModalOverlay>
          <Close onClick={closeModal}>CLOSE</Close>
          <Modal>
            <ImageModal src={imageSrc} alt="Image" />
          </Modal>
        </ModalOverlay>
      )}
    </div>
  );
};

export default ViewDiv;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  padding: 14px 16px;
  opacity: 0.7546;
  background: #000;
  width: 152px;
  position: absolute;
  top: 16px;
  left: 16px;
`;

const ViewImage = styled.p`
  color: #fff;
  text-align: right;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 2.143px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  text-align: center;
  position: relative;
`;

const ImageModal = styled.img`
  max-width: 100%;
  max-height: 80vh;
`;

const Close = styled.div`
  position: absolute;
  top: 54px;
  right: 24px;
  color: #fff;
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 3px;
  cursor: pointer;
`;
