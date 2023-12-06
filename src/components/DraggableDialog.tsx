import Dialog from '@mui/material/Dialog';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
import { SearchBar } from './SearchBar';

export default function DraggableDialog() {
  return (
    <Draggable
        axis='both'
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        scale={1}
    >
        <div className="handle"
        >
            <SearchBar />
        </div>
    </Draggable>
  );
}