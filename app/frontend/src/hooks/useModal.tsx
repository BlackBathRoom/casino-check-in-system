type ModalHTMLElement = HTMLElement & {
  showModal: () => void;
  close: () => void;
};

const isModalElement = (
  element: HTMLElement | null
): element is ModalHTMLElement => {
  return element !== null && 'showModal' in element && 'close' in element;
};

export const useModal = (id: HTMLElement['id']) => {
  const modalAction = (mode: 'open' | 'close') => {
    const modalElement = document.getElementById(id);
    if (!isModalElement(modalElement)) {
      throw new Error(
        `Element with id "${id}" is not a valid modal element. A valid modal element should be a <dialog> element or have both "showModal" and "close" methods.`
      );
    }

    if (mode === 'open') {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  };

  const openModal = () => modalAction('open');
  const closeModal = () => modalAction('close');

  return { id, openModal, closeModal };
};
