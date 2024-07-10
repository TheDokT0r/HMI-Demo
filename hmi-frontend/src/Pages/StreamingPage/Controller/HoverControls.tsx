import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Box, IconButton, Typography } from "@mui/material";
import "../StreamingPage.scss";
import useStreamer from "@/Store/StreamerStore";
import { useContext } from "react";
import { VideoContainerRefContext, VideoRefContext } from "../StreamingPage";
import useFullscreen from "@/Hooks/useFullscreen";

interface HoverControlsProps {
  hover: boolean;
  scale?: string;
}

export default function HoverControls({ hover, scale }: HoverControlsProps) {
  const videoContainerRef = useContext(VideoContainerRefContext);

  const { timestamp, setTimestamp, isPlaying, setIsPlaying } = useStreamer();
  const { isFullscreen } = useFullscreen(videoContainerRef);

  const videoRef = useContext(VideoRefContext);

  const moveTimestamp = (amount: number) => {
    const newTimestamp = timestamp + amount;
    setTimestamp(newTimestamp);

    if (videoRef.current) {
      videoRef.current.seekTo(newTimestamp);
    }
  };

  return (
    <Box
      visibility={hover && !isFullscreen ? "visible" : "hidden"}
      position="absolute"
      zIndex={10}
      width="100%"
      justifyItems="center"
      sx={{ transform: `scale(${scale})` }}
    >
      <IconButton onClick={() => moveTimestamp(-5)}>
        <Typography component="span">5</Typography>
        <UndoIcon />
      </IconButton>

      <IconButton onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>

      <IconButton onClick={() => moveTimestamp(5)}>
        <RedoIcon />
        <Typography component="span">5</Typography>
      </IconButton>
    </Box>
  );
}
