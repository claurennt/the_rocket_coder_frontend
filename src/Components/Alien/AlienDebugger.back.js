<ReactHowler
src={`${AlienSound}`}
playing={true}
mute={mute}
loop={true}
volume={0.5}
/>
{isFetching && (
<Loader
  type="Rings"
  color="#00BFFF"
  height={100}
  width={100}
  timeout={3000} //3 secs
/>
)}
<Button onClick={() => handleSkipScript()} className={classes.button}>
Skip ᐅ
</Button>
<Box style={{ backgroundColor: "black" }}>
<Container className={classes.root}>
  <Box
    display="flex"
    flexDirection="column"
    position="absolute"
    margin="0 auto"
  >
    {firstDialogue && (
      <Typist
        onTypingDone={() => {
          setTimeout(() => {
            setFirstDialogue(false);
          }, 2000);
          setTimeout(() => {
            setOpenSnack(true);
          }, 5000);
        }}
        className={classes.text}
        cursor={{ element: "" }}
      >
        <Typist.Delay ms={2000} />
        <p>Hi there, I am your alien debugger.. </p>
        <p>Explain to me your code line by line...</p>
        <p>
          Tell me which type of error are you getting and on which
          line...
        </p>
      </Typist>
    )}

    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnack}
        onClose={handleClose}
        onClick={handleClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#BDFFF3",
            color: "#5B217F",
          }}
          message={"Still stuck? Click me 👽"}
        />
      </Snackbar>
    </>

    {secondDialogue && (
      <>
        <Typist
          onTypingDone={() => {
            setMute(true);
            console.log('listening')
            SpeechRecognition.startListening();

            // setTimeout(() => {
            //   handlePostRequest();
            // }, 15000);
          }}
          className={classes.text}
          cursor={{ element: "" }}
        >
          <div>
            <p>
              I will use my extraterrestrial powers to help unstuck
              you... Talk to me...
            </p>
            <p>transcript: {transcript}</p>
            <Button onClick={() => handlePostRequest(recording)}>
              CLICK HERE
            </Button>
          </div>
        </Typist>
        {/* <ClickAwayListener
          onClickAway={handlePostRequest}
        ></ClickAwayListener> */}
      </>
    )}

    {googleLinks && <GoogleLinks googleLinks={googleLinks} />}
  </Box>

  <Typography
    component="div"
    style={{
      background: `url(${Alien}) `,
      backgroundPosition: "top",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh",
    }}
  />
</Container>

<AntSwitch
  checked={!mute}
  onChange={() => setMute(!mute)}
  name="muteMusic"
/>
</Box>