export function scaleCoords(coords, scale) {
		return coords.map(coord => coord * scale);
	}

function renderPrefilledAreas() {
		this.state.map.areas.map(area => {
			if (!area.preFillColor) return;
			this["draw" + area.shape](
				this.scaleCoords(area.coords),
				area.preFillColor,
				area.lineWidth || this.props.lineWidth,
				area.strokeColor || this.props.strokeColor
			);
		});
	}

	export function computeCenter(scaled_coords, shape) {

		const scaledCoords = scaled_coords;

		switch (shape) {
			case "circle":
				return [scaledCoords[0], scaledCoords[1]];
			case "poly":
			case "rect":
			default: {
				// Calculate centroid
				const n = scaledCoords.length / 2;
				const { y, x } = scaledCoords.reduce(
					({ y, x }, val, idx) => {
						return !(idx % 2) ? { y, x: x + val / n } : { y: y + val / n, x };
					},
					{ y: 0, x: 0 }
				);
				return [x, y];
			}
		}
    }

   export function renderAreas() {
		return this.state.map.areas.map((area, index) => {
			const scaledCoords = this.scaleCoords(area.coords);
			const center = this.computeCenter(area);
			const extendedArea = { ...area, scaledCoords, center };
			return (
				<area
					key={area._id || index}
					shape={area.shape}
					coords={scaledCoords.join(",")}
					onMouseEnter={this.hoverOn.bind(this, extendedArea, index)}
					onMouseLeave={this.hoverOff.bind(this, extendedArea, index)}
					onMouseMove={this.mouseMove.bind(this, extendedArea, index)}
					onClick={this.click.bind(this, extendedArea, index)}
					href={area.href}
				/>
			);
		});
	}
	