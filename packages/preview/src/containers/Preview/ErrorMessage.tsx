export const ErrorMessage = ({ error }: { error: string }) => (
  <div style={{ margin: '8px' }}>
    <b>Error running block:</b>
    <div style={{ marginTop: '16px', marginBottom: '32px' }}>
      <div
        style={{
          padding: '8px',
          borderRadius: '8px',
          backgroundColor: 'black',
          color: '#EEE',
        }}
      >
        <code>{error}</code>
      </div>
    </div>
    Check the console for errors.
    <div style={{ marginTop: '8px' }}>
      <a
        href="#"
        onClick={() => {
          window.location.reload();
        }}
      >
        Reset
      </a>
    </div>
  </div>
);
