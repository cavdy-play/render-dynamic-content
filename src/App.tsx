import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import './App.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const btnStyle = {
  border: '2px solid #ffffff',
  height: '100px',
  width: '100px',
};

type Content = {
  id: string;
  name: string;
  color?: string;
  children?: Content[];
};

const contents: Content[] = [
  {
    id: 'first',
    name: 'First',
  },
  {
    id: 'second',
    name: 'Second',
    color: 'pink',
    children: [
      {
        id: 'second-first',
        name: 'Second First',
      },
      {
        id: 'second-second',
        name: 'Second Second',
      },
      {
        id: 'second-third',
        name: 'Second Third',
      },
    ],
  },
  {
    id: 'third',
    name: 'Third',
    color: 'red',
    children: [
      {
        id: 'third-first',
        name: 'Third First',
      },
      {
        id: 'third-second',
        name: 'Third Second',
        children: [
          {
            id: 'third-second-first',
            name: 'Third Second First',
          },
          {
            id: 'third-second-second',
            name: 'Third Second Second',
            children: [
              {
                id: 'third-third-first',
                name: 'Third Third First',
              },
              {
                id: 'third-third-second',
                name: 'Third Third Second',
              },
              {
                id: 'third-third-third',
                name: 'Third Third Third',
              },
            ],
          },
          {
            id: 'third-second-third',
            name: 'Third Second Third',
          },
        ],
      },
      {
        id: 'third-third',
        name: 'Third Third',
      },
    ],
  },
];

const findParent = (
  items: Content[],
  id: string,
  parent?: Content
): Content | undefined => {
  for (const item of items) {
    const currentParent =
      item.id === id
        ? parent
        : item.children && findParent(item.children, id, item);
    if (currentParent) return currentParent;
  }
};

function App() {
  const [open, setOpen] = useState(false);
  const [bgColor, setBgColor] = useState('white');
  const [dynamicContent, setDynamicContent] = useState<JSX.Element>();

  const triggerNextChildren = (content: Content[] | Content) => {
    const isRoot = Array.isArray(content);
    const dataArr = isRoot ? content : content.children;

    return (
      <Box>
        <Button
          onClick={() => {
            if (isRoot) handleClose();
            else updateData(findParent(contents, content.id) || contents);
          }}
        >
          {isRoot ? 'Close' : 'Back'}
        </Button>
        {dataArr?.map((popup) => (
          <Button
            onClick={() => updateData(popup)}
            key={popup.id}
            sx={btnStyle}
          >
            {popup.name}
          </Button>
        ))}
      </Box>
    );
  };

  const updateData = (content: Content | Content[]) => {
    setDynamicContent(triggerNextChildren(content));
    if (!Array.isArray(content)) setBgColor(content.color || 'white');
  };

  const handleOpen = () => {
    setDynamicContent(triggerNextChildren(contents));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDynamicContent(undefined);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Settings</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, backgroundColor: bgColor }}>{dynamicContent}</Box>
      </Modal>
    </div>
  );
}

export default App;
