import React, { Component } from "react";
import { connect } from "react-redux";

class ImageViewer extends Component {
  render() {
    const { projectPath, image, folder, zoomRatio } = this.props;
    return (
      <div className="ImageViewer">
        <div className="ImageViewer__Content">
          {image && (
            <div
              className="ImageViewer__Image"
              style={{ transform: `scale(${zoomRatio})` }}
            >
              <img alt="" src={`${projectPath}/assets/${folder}/${image}`} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { id, section } = state.navigation;
  const files =
    section === "backgrounds"
      ? state.project.images
      : state.project.spriteSheets;
  const folder = section === "backgrounds" ? "backgrounds" : "sprites";
  const image = files.find(file => file.id === id) || files[0];
  return {
    projectPath: state.document && state.document.path,
    projectId: state.project.id,
    image: image && image.filename,
    folder,
    zoomRatio:
      ((state.project &&
        state.project.settings &&
        state.project.settings.zoom) ||
        100) / 100
  };
}

export default connect(mapStateToProps)(ImageViewer);