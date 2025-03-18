import { createContext, useContext, useState } from "react";

/**
 * @enum
 */
export const ModalType = {
  NONE: "none",
  ALERT_DIALOG: "alertDialog",
  ADDRESS_FORM: "addressForm"
}

const defaultValue = {
  type: ModalType.NONE,
  params: {}
}

const ModalContext = createContext(defaultValue);

export function ModalProvider({ children }) {
  const [data, setData] = useState(defaultValue);

  const createModal = (type, params) => (
    {
      request: () => {
        setData({
          type: type,
          params: params
        });
      },
      dismiss: () => {
        setData(defaultValue)
      }
    }
  );

  return (
    <ModalContext.Provider
      value={{
        modalData: data,
        createModal: createModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}