module.exports = {
  generalErrorHandler (err, req, res, next) {
    if (err instanceof Error) {
      req.flash('warning_msg', `${err.name}: ${err.message}`)
    } else {
      req.flash('warning_msg', `${err}`)
    }
    res.redirect('back')
    next(err)
  }
}
