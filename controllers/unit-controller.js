const db = require('../models')
const { Unit } = db
const { Agency } = db

const unitController = {
  unitsAll: (req, res, next) => {
    return Unit.findAll({
      raw: true,
      nest: true,
      include: [Agency]
    })
      .then((units) => { return res.render('index', { units }) })
      .catch((err) => next(err))
  },
  unitsId: (req, res, next) => {
    const id = req.params.id
    return Unit.findByPk(id, {
      include: [Agency]
    })
      .then(unit => res.render('detail', { unit }))
      .catch(err => next(err))
  },
  unitsEditPage: async (req, res, next) => {
    const id = req.params.id
    let statusTrue
    try {
      const unit = await Unit.findByPk(id, {
        include: [Agency]
      })
      const data = unit.dataValues
      const Agencies = await Agency.findAll({
        raw: true,
        nest: true
      })
      // 下拉選單顯示其他仲介
      const theRestAgencies = await Agencies.filter(
        (Agency) => Agency.id !== data.agencyId
      )
      // 偵測unit中的已出租有無勾選
      function ifCheckedBox () {
        if (data.status === true) {
          statusTrue = true
        }
      }
      await ifCheckedBox()
      await res.render('edit', { unit, theRestAgencies, statusTrue })
    } catch (err) {
      next(err)
    }
  },
  unitsEdit: (req, res, next) => {
    const {
      address, income, annualIncome, startDate, endDate, note, status, agencyId
    } = req.body
    if (!address || !income) throw new Error('unfilled field')
    const statusBoolean = (status === 'on')
    const incomeInt = parseInt(income, 10)
    const annualIncomeInt = parseInt(annualIncome, 10)
    Unit.findByPk(req.params.id)
      .then(unit => {
        if (!unit) throw new Error("Unit didn't exist!")
        return unit.update({
          address,
          income: incomeInt,
          annualIncome: annualIncomeInt,
          startDate,
          endDate,
          note,
          status: statusBoolean,
          agencyId
        })
      })
      .then((unit) => {
        req.flash('success_msg', 'Unit was successfully updated')
        res.redirect(`/units/${unit.id}`)
      })
      .catch(err => next(err))
  },
  unitsDeletePage: (req, res) => {
    return Unit.findAll({
      raw: true,
      nest: true,
      include: [Agency]
    })
      .then((units) => { return res.render('delete', { units }) })
      .catch((err) => { return res.status(422).json(err) })
  },
  unitsDelete: (req, res, next) => {
    const selectedId = Object.keys(req.body)
    const selectedIdList = selectedId.map((selectedId) => { return parseInt(selectedId, 10) })
    return selectedIdList.map(async (id) => {
      await Unit.findByPk(id)
        .then(unit => {
          if (!unit) throw new Error("unit didn't exist!")
          return unit.destroy()
        })
        .then(() => res.redirect('/units/delete'))
        .catch(err => next(err))
    })
  },
  unitsCreatePage: (req, res, next) => {
    return Agency.findAll({
      raw: true
    })
      .then((Agencies) => { res.render('new', { Agencies }) })
      .catch(err => next(err))
  },
  unitsCreate: (req, res, next) => {
    const {
      address, income, annualIncome, startDate, endDate, note, status, agencyId
    } = req.body
    if (!address || !income) throw new Error('unfilled field')
    const statusBoolean = (status === 'on')
    const incomeInt = parseInt(income, 10)
    const annualIncomeInt = parseInt(annualIncome, 10)
    Unit.create({
      address,
      income: incomeInt,
      annualIncome: annualIncomeInt,
      startDate,
      endDate,
      note,
      status: statusBoolean,
      agencyId
    })
      .then((unit) => {
        req.flash('success_msg', 'Unit was successfully created')
        res.redirect(`/units/${unit.id}`)
      })
      .catch(err => next(err))
  },
  // 供jQuery ajax取得仲介資料
  getAgencyDetail: async (req, res, next) => {
    try {
      const id = req.query.agencyId
      const agency = await Agency.findByPk(id, { raw: true })
      res.json(agency)
    } catch (err) {
      next(err)
    }
  }
}
module.exports = unitController
