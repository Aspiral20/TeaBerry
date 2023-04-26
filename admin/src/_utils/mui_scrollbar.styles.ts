const MUIScrollbarStyles = (
  pathElem: string = '&',
  width: string | number = '7px',
  bkgColorTrack: string = '255,255,255',
  display: string = 'block',
  bkgColorThumb: string = '0,0,0',
  borderRadius: string | number = '30px',
  opacityThumb: number = .6
) => ({
  [`${pathElem}::-webkit-scrollbar, ${pathElem}::-webkit-scrollbar-button`]: {
    width: width
  },
  [`${pathElem}::-webkit-scrollbar-track, ${pathElem}::-webkit-scrollbar-track-piece`]: {
    backgroundColor: `rgb(${bkgColorTrack})`,
    display: display
  },
  [`${pathElem}::-webkit-scrollbar-thumb`]: {
    backgroundColor: `rgba(${bkgColorThumb}, ${opacityThumb})`,
    borderRadius: borderRadius,
  },
  [`${pathElem}::-webkit-scrollbar-thumb:hover`]: {
    backgroundColor: `rgb(${bkgColorThumb})`,
  },
});

export default MUIScrollbarStyles;