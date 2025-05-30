function MyLicensePage() {
  return (
    <div className="myLicense container">
      <div className="row mt-3">
        <div className="col-md border rounded m-2 p-3">
          <div className="row">
            <div className="col-md p-2 d-flex flex-column align-items-center">
              <h2>PPL(A)</h2>
              <p className="text-muted">Licencja pilota turystycznego samolotowego</p>
            </div>
            <div className="col-md p-2 d-flex flex-column align-items-center">
              <h2>SEP(L)</h2>
              <p className="text-muted">Samoloty jednosilnikowe tłokowe lądowe</p>
              <span className="badge bg-success mt-auto">WAŻNE DO: 31.05.2027</span>
            </div>
            <div className="col-md p-2 d-flex flex-column align-items-center">
              <h2>NVFR</h2>
              <p className="text-muted">Uprawnienia do lotów VFR w nocy</p>
              <span className="badge bg-secondary mt-auto">Do zdobycia</span>
            </div>
            <div className="col-md p-2 d-flex flex-column align-items-center position-relative" style={{ minHeight: '120px' }}>
              <h2>Dodaj</h2>
              <div
                className="overlay d-flex justify-content-center align-items-center rounded"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgb(0,0,0)',
                  zIndex: 2,
                  transition: 'opacity 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0'}
                onMouseLeave={(e) => e.currentTarget.style.opacity= '1'}

              >
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-plus text-white" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
              </div>
              <p className="text-muted">Kliknij, aby dodać swoje uprawnienie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyLicensePage;